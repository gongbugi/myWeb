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
  }
}

provider "aws" {
  region = "ap-northeast-2"
}