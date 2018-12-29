const purchasePay = [
    {
        "_id": "5c272e47f794d7030d788aea",
        "date": "2018-09-30",
        "fittingsPay": [
            {
                "item": "配件采购",
                "cost": 1500
            }
        ],
        "fittingsPayTotal": 1500,
        "otherPay": [
            {
                "item": "清洁剂",
                "cost": 150
            }
        ],
        "otherPayTotal": 150,
        "totalPay": 1650
    },
    {
        "_id": "5c272ea9f794d7030d788aeb",
        "date": "2018-10-31",
        "fittingsPay": [
            {
                "item": "配件采购",
                "cost": 1300
            }
        ],
        "fittingsPayTotal": 1300,
        "otherPay": [
            {
                "item": "清洁剂",
                "cost": 150
            },
            {
                "item": "喷漆",
                "cost": 280,
                "key": 1546071678226
            }
        ],
        "otherPayTotal": 430,
        "totalPay": 1730
    },
    {
        "_id": "5c272f1ef794d7030d788aec",
        "date": "2018-11-30",
        "fittingsPay": [
            {
                "item": "配件购买",
                "cost": 2341
            }
        ],
        "fittingsPayTotal": 2341,
        "otherPay": [
            {
                "item": "笔记本电脑",
                "cost": 3800
            }
        ],
        "otherPayTotal": 3800,
        "totalPay": 6141
    }
];
export function getPurchasePay() {
    return purchasePay;
}