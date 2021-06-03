/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class SuperApp extends Contract {
    async initLedger(ctx) {
        console.info("============= START : Initialize Ledger ===========");
        const user = [
            {
                udi: "",
                name: "naren",
                epms: 1000,
            },
        ];

        const transaction = [
            {
                uid_user:"",
                uid_organization:"",
                epms=0
            },
        ];

        const organization = [
            {
                uid:"",
                name= "",
                epms_generated:0,
                epms_redeemed:0,
            },
        ];
        for (let i = 0; i < user.length; i++) {
            user[i].docType = "user";
            await ctx.stub.putState(
                "user" + i,
                Buffer.from(JSON.stringify(user[i]))
            );
            console.info("Added <--> ", user[i]);
        }

        for (let i = 0; i < transaction.length; i++) {
            transaction[i].docType = "transaction";
            await ctx.stub.putState(
                "tans" + i,
                Buffer.from(JSON.stringify(transaction[i]))
            );
            console.info("Added <--> ", transaction[i]);
        }

        for (let i = 0; i < organization.length; i++) {
            organization[i].docType = "organization";
            await ctx.stub.putState(
                "org" + i,
                Buffer.from(JSON.stringify(organization[i]))
            );
            console.info("Added <--> ", organization[i]);
        }
        console.info("============= END : Initialize Ledger ===========");
    }

    async queryUsers(ctx, userId) {
        const userAsBytes = await ctx.stub.getState(userId); // get the epm from chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`${userId} does not exist`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }


    async queryAllEpms(ctx) {
        const startKey = "EPM0";
        const endKey = "EPM999";

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString("utf8"));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString("utf8"));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString("utf8");
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log("end of data");
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}

module.exports = SuperApp;
