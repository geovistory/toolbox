DB_URL="postgres://postgres:pw@localhost:15432/filled_db"

while :; do
    # Get the first failed batch
    MESSAGE=$(psql $DB_URL --tuples-only --no-align -c "
      SELECT pgwar.update_full_texts(1000);
    ")

    
    # Extract the number from the string using parameter expansion
    NUMBER=${MESSAGE#*Number of rows updated: }

    # Check if the number is greater than 0
    if [ "$NUMBER" -gt 0 ]; then
        echo "Updated full texts: $NUMBER"
    else
        echo "All full texts have been updated."
        # exit the loop
      break

    fi
done