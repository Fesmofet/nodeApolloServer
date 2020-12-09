const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
  }

  type Author {
    name: String
    surname: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
  }
  
  type Mutation {
    addBook(title: String, author: String, id: String!): Book
  }
`;

const books = [
    {
      id: '1',
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: '2',
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
      book: (_, { id } ) => books.find((el)=> el.id === id),
      authors: () => authors,
    },
    Mutation : {
      addBook: (_, { title, author, id },) => {
        books.push({ title, author, id })
        return { title, author, id }
      }
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// mutation addBook {
//   addBook(title: "ddfsd", author: "dfd") {
//     author
//     title
//   }
// }

// query {
//   books {
//     title
//     author
//   }
// }

// query {
//   book(id: "1" ) {
//     title
//     author
//   }
// }
