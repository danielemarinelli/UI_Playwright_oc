a) To run the tests LOCALLY, set up the env with the following installation:
o npm install
o npm install -D allure-playwright
o npm install -g allure-commandline --force
o npx playwright install

run all tests in the test folder::: npx playwright test
run tests with particular tag::: npx playwright test --grep "@sanity"  
run tests from package.json::: npm run tests:login:headed

b) to run in GitHub Actions for CI, update line 31 of file playwright.yml under folder /.github/workflows , with the tests that you want to run. The trigger is the push command to main branch

c) With a correct configuration, tests can be executed in Jenkins for CI/CD selecting 'Freestyle project' or 'Pipeline' (with the 2nd choice , mandatory is to create a pipeline script
