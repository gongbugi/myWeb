locals {
  project_name = "myweb"
  env          = "dev"
}

module "vpc" {
  source = "../../modules/vpc"

  project_name         = local.project_name
  env                  = local.env
  vpc_cidr             = "10.0.0.0/16"
  azs                  = ["ap-northeast-2a", "ap-northeast-2c"]
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
}

module "security_group" {
  source = "../../modules/security_group"

  project_name = local.project_name
  env          = local.env

  vpc_id   = module.vpc.vpc_id
  vpc_cidr = module.vpc.vpc_cidr
}

module "aurora" {
  source = "../../modules/aurora"

  project_name = local.project_name
  env          = local.env

  private_subnet_ids = module.vpc.private_subnet_ids
  db_sg_id           = module.security_group.db_sg_id
}

module "elasticache" {
  source = "../../modules/elasticache"

  project_name = local.project_name
  env          = local.env

  private_subnet_ids = module.vpc.private_subnet_ids
  redis_sg_id        = module.security_group.redis_sg_id
}

module "eks" {
  source = "../../modules/eks"

  project_name = local.project_name
  env          = local.env

  subnet_ids = module.vpc.private_subnet_ids

  node_group = {
    instance_type = "t3.medium"
    desired_size  = 2
    max_size      = 3
    min_size      = 1
  }
}

module "alb_controller" {
  source = "../../modules/alb_controller"

  project_name = local.project_name
  env          = local.env

  oidc_provider_arn = module.eks.oidc_provider_arn
  oidc_provider_url = module.eks.oidc_provider_url
  cluster_name      = module.eks.cluster_name
  vpc_id            = module.vpc.vpc_id

  depends_on = [module.eks]
}

module "frontend" {
  source = "../../modules/frontend"

  project_name = local.project_name
  env          = local.env
}

module "cognito" {
  source = "../../modules/cognito"

  project_name = local.project_name
  env          = local.env
}
