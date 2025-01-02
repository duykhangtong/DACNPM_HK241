const moment = require('moment');
const db = require('../models/index');
const Printer = db.printer;
const PrintOrder = db.print_order;
const PageOrder = db.page_order;


const total_page_buy = async (month, year) => {
    try {
        const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
        const endDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').endOf('month').toDate();
        const pageOrders = await PageOrder.find({ purchase_time: { $gte: startDate, $lte: endDate } });

        const length = pageOrders.length;
        if (length === 0) {
            return 0;
        } else {
            let total_page_buy = 0;
            for (let i = 0; i < length; i++) {
                total_page_buy += pageOrders[i].number_of_page;
            }
            return total_page_buy;
        }
    } catch (error) {
        console.error(error);
    }

}

const report = async (month, year) => {
    try {
        const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
        const endDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').endOf('month').toDate();

        const data = {};
        let amount = 0;
        let A3 = 0;
        let A4 = 0;
        let count = 1;

        for await (const printer of Printer.find({})) {
            const printOrders = await PrintOrder.find({
                printer_id: printer._id,
                isTransaction: true,
                start_time: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            let subAmount = printOrders.length;
            let subA3 = 0;
            let subA4 = 0;

            if (subAmount === 0) continue;

            for (let i = 0; i < subAmount; i++) {
                if (printOrders[i].page_size === "A4") {
                    subA4 += printOrders[i].total_print_pages;
                } else {
                    subA3 += printOrders[i].total_print_pages / 2;
                }
            }

            data[count] = {
                printer: printer.name,
                amount: subAmount,
                number_A3: subA3,
                number_A4: subA4
            }

            amount += subAmount;
            A4 += subA4;
            A3 += subA3;

            count++;
        }

        const page_buyed = await total_page_buy(month, year);
        const total = {
            total_amount: amount,
            total_A3: A3,
            total_A4: A4,
            total_page_buy: page_buyed
        };

        data.total = total;

        return data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = { report };
