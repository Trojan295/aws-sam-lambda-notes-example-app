
1. Hook functions must start with prefix "CodeDeployHook_" or you have to provide an custom IAM role for the CodeDeploy in `DeploymentPreference`
2. The hook functions must response to AWS API, if the hook passed or failed. CodeDeploy timeouts after 1 hour waiting resulting in a fail. You need to provide the policy to those functions, so they can all the API
3. The `Alarms` in `DeploymentPreference` can be used to rollback the deployment on Cloudwatch Alarm. The AWS docs suggest the other way - that they are triggered by a failed deployment