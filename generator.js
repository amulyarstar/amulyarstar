name: Generate Rama Arrow Contribution

on:
  schedule:
    # Runs every 24 hours
    - cron: "0 0 * * *" 
  workflow_dispatch: # Allows manual triggers

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Generate Output Folder
        run: mkdir -p dist

      - name: Run Animation Generator
        run: node generator.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Push to Output Branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
