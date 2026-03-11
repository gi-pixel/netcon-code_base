#!/bin/bash

echo "------------------------------------------"
echo "  Web Project Structure Generator"
echo "------------------------------------------"
echo ""
echo ""
read -p "Enter the name of your project folder: " PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
    echo "Error: Project name cannot be empty. Exiting."
    exit 1
fi

read -p "Create '$PROJECT_NAME' in the current directory? (y/n): " CONFIRM
if [[ $CONFIRM != "y" && $CONFIRM != "Y" ]]; then
    echo "Operation cancelled."
    exit 1
fi

echo "Building your project..."

mkdir -p "$PROJECT_NAME"/{pages,css,js,images,assets/fonts}

touch "$PROJECT_NAME"/index.html
touch "$PROJECT_NAME"/README.md
touch "$PROJECT_NAME"/pages/{about.html,services.html,contact.html}
touch "$PROJECT_NAME"/css/style.css
touch "$PROJECT_NAME"/js/script.js

cat <<EOF > "$PROJECT_NAME"/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$PROJECT_NAME</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>Welcome to $PROJECT_NAME</h1>
    <script src="js/script.js"></script>
</body>
</html>
EOF


echo "------------------------------------------"
echo "Done! Your project '$PROJECT_NAME' is ready."
echo "Navigate to it by typing: cd $PROJECT_NAME"