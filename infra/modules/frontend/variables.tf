variable "project_name" {
  description   = "프로젝트 이름"
  type          = string
}

variable "env" {
    description = "환경 (dev/prod)"
    type        = string
}

variable "alb_domain" {
  description = "Backend ALB Domain Name"
  type        = string
}