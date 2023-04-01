<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include database connection file
require __DIR__.'/Database.php';


// Function to generate response message with status and success values, and optional extra data
function msg($success,$status,$message,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ],$extra);
}

// Connect to database
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// Decode request data from JSON format
$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// Check HTTP request method
if($_SERVER["REQUEST_METHOD"] != "POST"):
    // Return error response if request method is not POST
    $returnData = msg(0,404,'Page Not Found!');

elseif(!isset($data->email) 
    || !isset($data->password)
    || empty(trim($data->email))
    || empty(trim($data->password))
    ):

    $fields = ['fields' => ['email','password']];
    $returnData = msg(0,422,'You have empty fields',$fields);

// Extract email and password values from request data
else:
    $email = trim($data->email);
    $password = trim($data->password);

    // Validate email and password values
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)):
        $returnData = msg(0,422,'Invalid Email Address!');
    
    elseif(strlen($password) < 8):
        $returnData = msg(0,422,'Your password must be at least 8 characters long!');

    else:
        try{
            // Query database to check if user with the given email exists
            $fetch_user_by_email = "SELECT * FROM `users` WHERE `email`=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

            // IF THE USER IS FOUNDED BY EMAIL
            if($query_stmt->rowCount()):
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                if($check_password):
                   
                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully logged in.',
                    ];

                else:
                    $returnData = msg(0,422,'Invalid Password!');
                endif;

            // If no user with the given email is found, return error response
            else:
                $returnData = msg(0,422,'Invalid Email Address!');
            endif;
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage());
        }

    endif;

endif;

echo json_encode($returnData);
?>
