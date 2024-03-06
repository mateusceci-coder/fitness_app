endpoint: workouts/exercises/
    method: GET
    response: {
        workout:        
        exercise {
            id
            created_by
            name
            equipment
            rep_max
            created_at
        },
        series
        repetitions
    }
    Return all exercises for a given workout

endpoint: workouts/exercises/<int:pk>/
    method: GET not allowed yet
    method: PUT not allowed yet
    method: DELETE not allowed yet

endpoint: workouts/
    method: GET
    response: {
    "id": number        is the id of the workout
    "name": string,     is the name of the workout
    "exercises": [
        {
        "workout": number,
        "exercise": {
            "id": number,
            "created_by": string,
            "name": string,
            "equipment": string,
            "rep_max": number,
            "created_at": number
        },
        "series": number,
        "repetitions": number
        }
    ],
    "created_by": string
    },

    method: POST
    request: {
        "name": string,
        "exercises": [
        {
            "exercise": {
                "name": string,
                "equipment": string,
                "rep_max": number
            },
            "series": number,
            "repetitions": number
        },
        {
            "exercise": {
                "name": string,
                "equipment": string,
                "rep_max": number
            },
            "series": number,
            "repetitions": number
        },
        ]
    }
    Create a new workout, if the exercise doesn't exist it will be created
    Status code: 201
    Response: {
        Same as GET
    }
    method: DELETE
    Status code: 204
    Response: {
        "message": "Workout deleted successfully"
    }

endpoint: workouts/<int:pk>/
    method: GET
    response: {
        Same as GET workouts/, but with only one workout
    }