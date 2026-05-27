variable "project_name" {
  description = "프로젝트 이름"
  type = string
}

variable "env" {
    description = "환경 (dev/prod)"
    type = string
}

variable "vpc_id" {
    description = "VPC ID"
    type = string
}

variable "vpc_cidr" {
    description = "VPC CIDR 블록"
    type = string
}