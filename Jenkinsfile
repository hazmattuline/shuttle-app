#!groovy

@Library('common-jenkins-library')
import common.uline.jenkins.*

//################################### Define Jenkins Pipeline specific configurations ###################################

def pipelineConfigs = new PipelineConfigs()

pipelineConfigs.skipTesting = false

pipelineConfigs.skipSonar = false

pipelineConfigs.failBuildOnSmokeTestFailure = false

pipelineConfigs.bumpArtifactVersion = true

pipelineConfigs.smokeTestSlackChannel = "oss_smoketest"

pipelineConfigs.emailRecipients = ["George.Gutt@uline.com","Charles.Pechous@uline.com","Talab.Omar@uline.com","vijaya.peddareddy@uline.com"]

//############################################ Trigger Client/Server Jenkins Pipeline ##########################################

new PipelineBootstrap().createClientServerJenkinsPipeline().triggerClientServerProjectPipeline(pipelineConfigs)