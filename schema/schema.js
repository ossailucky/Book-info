import graphql from "graphql";
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,  GraphQLList   } = graphql;
import _ from "lodash";
import Book from "../models/book.js";
import  Author from "../models/author.js";



const BookType = new GraphQLObjectType({
    name: "Book",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               // return _.filter(books,{authorId:parent.id});
            }
        }
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
               //return _.find(books,{id:args.id});

            }
        },
        
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
               // return _.find(authors,{id:args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
        
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new  Author({
                    name:args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type:GraphQLID}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre:args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

export default new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});