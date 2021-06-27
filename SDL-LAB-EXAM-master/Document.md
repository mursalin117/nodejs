FORMAT: 1A
HOST: https://polls.apiblueprint.org/

# Department-Notice Board
Node.js web application 'department' where we will be building a Node.js RESTful API for creating, updating, retrieving and deleting notice

## Questions Collection [/questions]

### List All Questions [GET]
+ Headers

            Location: /department/notice/

+ Response 200 (application/json)

        [
             {
                {
                    "_id": "5e5f647c16c8411f866c3a33",
                    "subject": "Algorithm Lab Exam",
                    "description": "Dear all students in 2nd year 2nd semester we are inform you your Desing Analysis and Algorithms lab will be held on date: (08/03/2020).",
                    "date": "2020-03-04T08:19:08.694Z",
                    "__v": 0
                },
                {
                    "_id": "5e5f651b16c8411f866c3a34",
                    "subject": "Yearly picnic",
                    "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 700/= Taka",
                    "date": "2020-03-04T08:21:47.634Z",
                    "__v": 0
            }
        ]

### Create a New Question [POST]

You may create your own question using this action. It takes a JSON
object containing a question and a collection of answers in the
form of choices.

+ Headers

            Location: /department/notice/

+ Request (application/json)

        {
	        "subject": "Yearly picnic",
	        "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 700/= Taka"
        }

+ Response 201 (application/json)

    + Headers

            Location: /department/notice/

    + Body

            {
                "_id": "5e5f651b16c8411f866c3a34",
                "subject": "Yearly picnic",
                "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 700/= Taka",
                "date": "2020-03-04T08:21:47.634Z",
                "__v": 0
            }
## User Retrieve Update and Delete [/capmus/user/5e0cac88dd30799095c842f7]

### Get single User [GET]
   + Headers

            Location: /department/notice/5e5f651b16c8411f866c3a34

    + Body

            {
                "_id": "5e5f651b16c8411f866c3a34",
                "subject": "Yearly picnic",
                "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 700/= Taka",
                "date": "2020-03-04T08:21:47.634Z",
                "__v": 0
            }


### Update a User [PATCH]

You may update a  user using this action. It takes a JSON
object containing update user information.

+ Request (application/json)
    + Headers

            Location: /department/notice/5e5f651b16c8411f866c3a34

    + Body
  
            {
                "description":"Dear all students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 1000/= Taka"
            }

+ Response 200 (application/json)

    + Body
            
            {
                "_id": "5e5f651b16c8411f866c3a34",
                "subject": "Yearly picnic",
                "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 1000/= Taka",
                "date": "2020-03-04T08:21:47.634Z",
                "__v": 0
            }

### Delete a User [DELETE]

You may delete a user using this action.


+ Response 200 (application/json)

    + Headers

            Location: /department/notice/5e5f651b16c8411f866c3a34

    + Body
            
            {
                "_id": "5e5f651b16c8411f866c3a34",
                "subject": "Yearly picnic",
                "description": "Dear all the students in department of Computer Science and Engineering, we will inform you to our Yearly Picnic-2020 is held very soon. Fee 1000/= Taka",
                "date": "2020-03-04T08:21:47.634Z",
                "__v": 0
            }




### Thanks for use my API