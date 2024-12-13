const data = {
  authors: [
    {
      id: "1",
      name: "Shrey Thakkar",
      address: "Bhayli",
      books_id: ["101", "102"],
    },
    {
      id: "2",
      name: "Kamil Khan",
      address: "Ellorapark",
      books_id: ["103"],
    },
  ],
  books: [
    {
      id: "101",
      title: "Frontend System Design",
      publish_year: 2024,
      author_id: "1",
    },
    {
      id: "102",
      title: "Backend System Design",
      publish_year: 2021,
      author_id: "1",
    },
    {
      id: "103",
      title: "Devops",
      publish_year: 2022,
      author_id: "2",
    },
  ],
};

export const resolvers = {
  Book: {
    author: (parent, args) => {
      return data.authors.find((element) => element.id === parent.author_id);
    },
  },
  Author: {
    books: (parent) => {
      return data.books.filter((element) =>
        parent.books_id.includes(element.id)
      );
    },
  },
  Query: {
    books: () => {
      return data.books;
    },
    authors: () => {
      return data.authors;
    },
  },
  Mutation: {
    addBook: (parent, args) => {
      console.log(args, "args");
      const new_book = { ...args, id: data.books.length + 1 };
      data.books.push(new_book);
      return new_book;
    },
  },
};
