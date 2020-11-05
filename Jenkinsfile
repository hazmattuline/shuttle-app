#!groovy

@Library('common-jenkins-library')
import common.uline.jenkins.configs.PipelineConfigs
import common.uline.jenkins.bootstrap.PipelineBootstrap


//################################### Define Jenkins Pipeline specific configurations ###################################

def pipelineConfigs = new PipelineConfigs()

pipelineConfigs.skipTesting = false

pipelineConfigs.skipSonar = false

pipelineConfigs.bumpArtifactVersion = true

pipelineConfigs.failBuildOnSmokeTestFailure = false

pipelineConfigs.emailRecipients = ["Renju.Jose@uline.com", "Rob.Kenlay@uline.com", "Arun.Thakur@uline.com"]

pipelineConfigs.smokeTestSlackChannel = "g2_shuttle_app_pr_mon"

pipelineConfigs.msTeamsWebHookURL="https://outlook.office.com/webhook/3b28505a-7662-4db0-9011-5ad8dd1ac0d9@3449b799-3e5e-463a-bcf6-01510d3ae942/IncomingWebhook/eab899ce7aeb4ce481a3bcb30e860f0f/0fd186b8-8b3f-4f6c-b836-050d8354c7c9"

//############################################ Trigger Client/Server Jenkins Pipeline ##########################################

new PipelineBootstrap().createClientServerJenkinsPipeline().triggerClientServerProjectPipeline(pipelineConfigs)