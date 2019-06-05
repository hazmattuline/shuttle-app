#!groovy

@Library('common-jenkins-library')
import common.uline.jenkins.*

//################################### Define Jenkins Pipeline specific configurations ###################################

def pipelineConfigs = new PipelineConfigs()

pipelineConfigs.skipTesting = false

pipelineConfigs.skipSonar = false

pipelineConfigs.bumpArtifactVersion = false

pipelineConfigs.failBuildOnSmokeTestFailure = false

pipelineConfigs.emailRecipients = ["Renju.Jose@uline.com", "Rob Kenlay@uline.com", "Arun.Thakur@uline.com"]

pipelineConfigs.smokeTestSlackChannel = "g2_shuttle_app_pr_mon"

//############################################ Trigger Common Jenkins Pipeline ##########################################

new PipelineBootstrap().createClientServerJenkinsPipeline().triggerClientServerProjectPipeline(pipelineConfigs)