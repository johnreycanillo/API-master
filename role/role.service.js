const db = require('_helpers/db');


module.exports = {
   
    create,
    update
};

async function create(params) {

    const account = new db.Account(params);
    account.verified = Date.now();

    // save account
    await account.save();

    return basicDetails(account);
}

async function update(id, params) {
    const account = await getAccount(id);

    // copy params to account and save
    Object.assign(account, params);
    account.updated = Date.now();
    await account.save();

    return basicDetails(account);
}
