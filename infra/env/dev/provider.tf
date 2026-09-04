terraform {
  # S3를 상태 저장소(Backend)로 지정
  backend "s3" {
    bucket         = "myweb-terraform-state-gong-0514" 
    key            = "dev/network/terraform.tfstate"
    region         = "ap-northeast-2"
    use_lockfile   = true
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    helm = {
      source = "hashicorp/helm"
      version = "~> 2.0"
    }

  }
}

provider "aws" {
  region = "ap-northeast-2"
}

provider "helm" {
  kubernetes {
    host = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      args = ["eks", "get-token", "--cluster-name", module.eks.cluster_name]
      command = "aws"
    }
  }
}