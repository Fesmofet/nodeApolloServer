const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    surname: String
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const authors = [
  {
    name: 'Boris',
    surname: 'Andrzhievsky',
  },
  {
    name: 'Alexey',
    surname: 'Sanin',
  },
]

const resolvers = {
    Query: {
      books: () => books,
      authors: () => authors,
    },
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

