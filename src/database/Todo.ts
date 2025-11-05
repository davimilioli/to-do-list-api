import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "./database";

export class TodoModel extends Model<
  InferAttributes<TodoModel>,
  InferCreationAttributes<TodoModel>
> {
  declare id?: number;
  declare title: string;
  declare completed: boolean;
}

TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "todos",
    timestamps: false,
  }
);
