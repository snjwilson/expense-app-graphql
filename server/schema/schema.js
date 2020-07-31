const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
} = graphql;

const expensesArray = [
  {
    id: '1',
    name: 'Grocery',
    amount: 420,
  },
  {
    id: '2',
    name: 'Laptop SSD',
    amount: 7033.5,
  },
];

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    amount: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    expense: {
      type: ExpenseType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // fetch data
        return _.find(expensesArray, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
