variable "project_name" {
  description = "프로젝트 이름"
  type        = string
}

variable "env" {
  description = "환경 (dev/prod)"
  type        = string
}

variable "private_subnet_ids" {
  description = "DB 서브넷 그룹용프라이빗 서브넷 ID 목록"
  type        = list(string)
}

variable "db_sg_id" {
  description = "Aurora MySQL용 보안 그룹 ID"
  type        = string
}
