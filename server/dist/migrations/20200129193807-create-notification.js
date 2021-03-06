"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Notifications", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            body: {
                type: Sequelize.STRING
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id",
                    as: "userId"
                }
            },
            status: {
                type: Sequelize.ENUM,
                values: ["read", "unread"]
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Notifications");
    }
};
//# sourceMappingURL=20200129193807-create-notification.js.map