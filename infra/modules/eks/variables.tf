variable "project_name" {
    description   = "프로젝트 이름"
    type          = string
}

variable "env" {
    description = "환경 (dev/prod)"
    type        = string
}

variable "subnet_ids" {
    description = "EKS 클러스터용 서브넷 ID 목록"
    type = list(string)
}

variable "node_group" {
    description = "EKS 노드 그룹 설정"
    type = object({
        instance_type = string
        desired_size = number
        max_size = number
        min_size = number
    })
}