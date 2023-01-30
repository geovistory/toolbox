# Script to check if main branch is ahead of --branch
# If yes: it exits with 1
# else: it goes on


# exit when any command fails
set -e

# Fetch the arguments
POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    --branch)
      branch="$2"
      shift # past argument
      shift # past value
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters



if [[  -z $(git log $branch..origin/main) ]] 
then
    echo Ok, $branch is up to date with main
else
    echo ERROR: Main branch is ahead of $branch
    exit 1
fi