const db = require('../models/db');

const getProducts = (req, res) => {
    const products = [
        { id: 1, name: 'Lounge Chair', price: 2000, category: 'Chairs' },
        { id: 2, name: 'Dining Chair', price: 1800, category: 'Chairs' },
        { id: 3, name: 'Table1', price: 3000, category: 'Tables' },
        { id: 4, name: 'Table2', price: 3200, category: 'Tables' },
        { id: 5, name: 'Table3', price: 3100, category: 'Tables' },
        { id: 6, name: 'Dining Top', price: 900, category: 'Tops' }
    ];
    res.json(products);
};

const checkout = async (req, res) => {
    const { user, cartItems } = req.body;

    db.beginTransaction(async (err) => {
        if (err) throw err;

        try {
            // Check if user already exists with the same name and email
            const [existingUser] = await db.promise().query(
                'SELECT id FROM Users WHERE name = ? AND email = ?',
                [user.name, user.email]
            );

            let userId;
            if (existingUser.length > 0) {
                // User exists, use existing ID
                userId = existingUser[0].id;
            } else {
                // Insert new user
                const [newUser] = await db.promise().query(
                    'INSERT INTO Users (name, email) VALUES (?, ?)',
                    [user.name, user.email]
                );
                userId = newUser.insertId;
            }

            // Calculate order amount
            const orderAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

            // Insert order
            const [newOrder] = await db.promise().query(
                'INSERT INTO Orders (amount, user_id) VALUES (?, ?)',
                [orderAmount, userId]
            );

            const orderId = newOrder.insertId;

            // Insert order items
            const insertOrderItems = (table, order_id, item_id, item_value) => {
                return db.promise().query(
                    `INSERT INTO ${table} (order_id, ${item_id}) VALUES (?, ?)`,
                    [order_id, item_value]
                );
            };

            const insertPromises = cartItems.map((item) => {
                let table, item_id;
                switch (item.category) {
                    case 'Chairs':
                        table = 'Order_Chairs';
                        item_id = 'chair_id';
                        break;
                    case 'Tables':
                        table = 'Order_Tables';
                        item_id = 'table_id';
                        break;
                    case 'Tops':
                        table = 'Order_Tops';
                        item_id = 'top_id';
                        break;
                    default:
                        return Promise.reject(new Error('Unknown category'));
                }
                return insertOrderItems(table, orderId, item_id, item.id);
            });

            await Promise.all(insertPromises);

            db.commit((err) => {
                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }
                res.send('Order placed successfully');
            });
        } catch (err) {
            db.rollback(() => {
                throw err;
            });
        }
    });
};

module.exports = {
    getProducts,
    checkout
};
