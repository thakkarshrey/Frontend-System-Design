export const typeDefs = `#graphql
    type Author {
        id : ID!
        name : String!
        address : String
        books : [Book]
    }

    type Book {
        id : ID!
        title : String!
        publish_year : Int
        author : Author  

        # jevu Query ni andar books define kari che ke bhai books naam nu resolver function hase ane e Book no array return karse evi j rite mei aiya Author return thase evu kidhu che to mare resolver function pan lakhvu padse
    }

    # ! indicates that the field is mandatory
    # All the data related to get request should be defined in Query
    
    type Query {
        books : [Book]
        authors : [Author]
    }

    type Mutation {
        addBook(title : String!, author_id: String!, publish_year: Int) : Book
    }

    # All the data related to post request should be defined in Mutation
`;
