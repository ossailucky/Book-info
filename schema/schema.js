import graphql from "graphql";
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt  } = graphql;
import _ from "lodash"


//dummy data 
var books = [
    {name:"Name of the Wind",genre:"Fantasy", id:"1"},
    {name:"The Final Empire",genre:"Fantasy", id:"2"},
    {name:"The Long Earth",genre:"Sci-Fi", id:"3"},
];

var authors = [
    {name: "Patrick Rothfuss", age: 44, id: "1"},
    {name: "Brandon Sanderson", age: 42, id: "2"},
    {name: "Terry Prachett", age: 66, id: "2"}


];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                // code to get data from db / other source
               return _.find(books,{id:args.id});

            }
        },
        
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors,{id:args.id})
            }
        }
        
    }
});

export default new GraphQLSchema({
    query:RootQuery
});