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

//############################################ Trigger Client/Server Jenkins Pipeline ##########################################

new PipelineBootstrap().createClientServerJenkinsPipeline().triggerClientServerProjectPipeline(pipelineConfigs)