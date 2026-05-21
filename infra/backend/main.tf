terraform {
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

# 상태 파일을 저장할 S3 버킷 생성
resource "aws_s3_bucket" "terraform_state" {
  bucket = "myweb-terraform-state-gong-0514"
  force_destroy = true
}

# S3 버킷 버전 관리 활성화
resource "aws_s3_bucket_versioning" "terraform_state_versioning" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}