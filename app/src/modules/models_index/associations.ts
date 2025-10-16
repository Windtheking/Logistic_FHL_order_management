import Client from "../clients/clients.models";
import OrderState from "../orderState/orderState.models";
import Warehouse from "../wareHouses/wareHouses.models";
import OrderAddress from "../orderAdress/orderAdress.models";
import Order from "../Order/order.models";
import OrderHistory from "../orderHistory/orderHistory.models";

/**
 * Initializes all model associations based on the SQL schema.
 */
export const applyAssociations = () => {
  // Client - Order (1:N)
  Client.hasMany(Order, { foreignKey: "clientid", as: "orders" });
  Order.belongsTo(Client, { foreignKey: "clientid", as: "client" });

  // Client - OrderHistory (1:N)
  Client.hasMany(OrderHistory, { foreignKey: "clientid", as: "order_history" });
  OrderHistory.belongsTo(Client, { foreignKey: "clientid", as: "client" });

  // OrderState - Order (1:N)
  OrderState.hasMany(Order, { foreignKey: "orderstateid", as: "orders" });
  Order.belongsTo(OrderState, { foreignKey: "orderstateid", as: "state" });

  // Warehouse - Order (1:N)
  Warehouse.hasMany(Order, { foreignKey: "warehouseid", as: "orders" });
  Order.belongsTo(Warehouse, { foreignKey: "warehouseid", as: "warehouse" });

  // OrderAddress - Order (1:N)
  OrderAddress.hasMany(Order, { foreignKey: "orderaddressid", as: "orders" });
  Order.belongsTo(OrderAddress, { foreignKey: "orderaddressid", as: "address" });

  // Order - OrderHistory (1:N)
  Order.hasMany(OrderHistory, { foreignKey: "orderid", as: "order_history" });
  OrderHistory.belongsTo(Order, { foreignKey: "orderid", as: "order" });
};
