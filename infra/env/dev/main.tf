locals {
  project_name = "myweb"
  env = "dev"
}

module "vpc" {
  source = "../../modules/vpc"

  project_name = local.project_name
  env  = local.env
  vpc_cidr             = "10.0.0.0/16"
  azs                  = ["ap-northeast-2a", "ap-northeast-2c"]
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
}

module "kms" {
  source = "../../modules/kms"

  project_name = local.project_name
  env  = local.env
}

module "security_group" {
  source = "../../modules/security_group"

  project_name = local.project_name
  env  = local.env

  vpc_id = module.vpc.vpc_id
  vpc_cidr = module.vpc.vpc_cidr
}

module "aurora" {
  source = "../../modules/aurora"

  project_name = local.project_name
  env = local.env

  private_subnet_ids = module.vpc.private_subnet_ids
  db_sg_id = module.security_group.db_sg_id
  kms_key_arn = module.kms.key_arn
}

module "elasticache" {
  source = "../../modules/elasticache"

  project_name = local.project_name
  env  = local.env

  private_subnet_ids = module.vpc.private_subnet_ids
  redis_sg_id = module.security_group.redis_sg_id
}

module "eks" {
  source = "../../modules/eks"

  project_name = local.project_name
  env  = local.env

  subnet_ids = module.vpc.public_subnet_ids

  node_group = {
    instance_type = "t3.medium"
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }
}