workflow "Build and push Docker image" {
  on = "push"
  resolves = [
    "Tag with latest",
    "Push latest image",
  ]
}

action "Login to Docker registry" {
  uses = "actions/docker/login@c08a5fc9e0286844156fefff2c141072048141f6"
  secrets = [
    "DOCKER_PASSWORD",
    "DOCKER_USERNAME",
  ]
}

action "Build Docker image" {
  uses = "actions/docker/cli@c08a5fc9e0286844156fefff2c141072048141f6"
  args = "build -t build ."
  needs = ["Login to Docker registry"]
}

action "Tag with latest" {
  uses = "actions/docker/cli@c08a5fc9e0286844156fefff2c141072048141f6"
  needs = ["Build Docker image"]
  args = "tag build lucasgsm88/herobot:latest"
}

action "Push latest image" {
  uses = "actions/docker/cli@c08a5fc9e0286844156fefff2c141072048141f6"
  args = "push lucasgsm88/herobot:latest"
  needs = [
    "Login to Docker registry",
    "Tag with latest",
  ]
}
