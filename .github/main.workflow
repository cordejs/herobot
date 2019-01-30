workflow "New workflow" {
  on = "release"
  resolves = "release"
}

action "GitHub Action for Heroku" {
  uses = "actions/heroku@6db8f1c22ddf6967566b26d07227c10e8e93844b"
  secrets = ["GITHUB_TOKEN"]
}
