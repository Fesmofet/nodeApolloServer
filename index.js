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
  
  type Mutation {
    addBook(title: String, author: String): Book
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
    Mutation : {
      addBook: (_, { title, author },) => {
        console.log(title, author)
        books.push({ title, author })
        return { title, author }
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
