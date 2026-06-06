variable "project_name" {
  description   = "프로젝트 이름"
  type          = string
}

variable "env" {
    description = "환경 (dev/prod)"
    type        = string
}

variable "oidc_provider_arn" {
    description = "oidc arn"
    type = string
}

variable "oidc_provider_url" {
    description = "oidc url"
    type = string
}

variable "cluster_name" {
    description = "클러스터 이름"
    type = string
}