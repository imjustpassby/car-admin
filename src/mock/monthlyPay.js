const monthlyPay = [
    {
        "_id": "5c272aa5f794d7030d788ae6",
        "date": "2018-09-30",
        "basePay": [
            {
                "item": "水电",
                "cost": 500
            },
            {
                "item": "租金",
                "cost": 3000,
                "key": 1546070649298
            }
        ],
        "basePayTotal": 3500,
        "salaryPay": [
            {
                "item": "王小虎1",
                "cost": 3500
            },
            {
                "item": "王小虎2",
                "cost": 3200,
                "key": 1546070582659
            }
        ],
        "salaryPayTotal": 6700,
        "otherPay": [
            {
                "item": "保险费",
                "cost": 1000
            }
        ],
        "otherPayTotal": 1000,
        "totalPay": 11200
    },
    {
        "_id": "5c272caef794d7030d788ae8",
        "date": "2018-10-31",
        "basePay": [
            {
                "item": "水电",
                "cost": 400
            },
            {
                "item": "租金",
                "cost": 3000,
                "key": 1546070996115
            },
            {
                "item": "管理",
                "cost": 500,
                "key": 1546071008967
            }
        ],
        "basePayTotal": 3900,
        "salaryPay": [
            {
                "item": "王小虎1",
                "cost": 3500
            },
            {
                "item": "王小虎2",
                "cost": 3200,
                "key": 1546071037393
            }
        ],
        "salaryPayTotal": 6700,
        "otherPay": [
            {
                "item": "保险费",
                "cost": 1000
            },
            {
                "item": "运输费",
                "cost": 200,
                "key": 1546071056955
            }
        ],
        "otherPayTotal": 1200,
        "totalPay": 11800
    },
    {
        "_id": "5c272d2cf794d7030d788ae9",
        "date": "2018-11-30",
        "basePay": [
            {
                "item": "水电",
                "cost": 443
            },
            {
                "item": "租金",
                "cost": 3000,
                "key": 1546071249059
            }
        ],
        "basePayTotal": 3443,
        "salaryPay": [
            {
                "item": "王小虎1",
                "cost": 3500
            },
            {
                "item": "王小虎2",
                "cost": 3200,
                "key": 1546071282126
            },
            {
                "item": "王小虎2",
                "cost": 3000,
                "key": 1546071282160
            }
        ],
        "salaryPayTotal": 9700,
        "otherPay": [
            {
                "item": "保险",
                "cost": 1000
            },
            {
                "item": "运输",
                "cost": 200,
                "key": 1546071310578
            }
        ],
        "otherPayTotal": 1200,
        "totalPay": 14343
    }
];
export function getMonthlyPay() {
    return monthlyPay;
}