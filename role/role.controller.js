const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const roleService = require('./role.service');
const Role = require('../_helpers/role');
const Role = require('../_helpers/role');

// routes

router.get('/', authorize(Role), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);

module.exports = router;

function getAll(req, res, next) {
    roleService.getAll()
        .then(role => res.json(role))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admins can get any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    roleService.getById(req.params.id)
        .then(role => role ? res.json(role) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        role: Joi.string().valid(Role.Admin, Role.User).required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
   roleService.create(req.body)
        .then(role => res.json(role))
        .catch(next);
}


function update(req, res, next) {
    // users can update their own account and admins can update any account
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    accountService.update(req.params.id, req.body)
        .then(role => res.json(role))
        .catch(next);
}
