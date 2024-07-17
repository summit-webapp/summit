!/bin/sh

# echo "I ran successfully"

Directory="./themes"
if [ -d "$Directory" ]
then  
# If variable less than 10  
   echo "themes exists"
   exit 0
else
    echo "themes doesn't exists"
    exit 1
fi 