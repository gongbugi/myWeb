module "vpc" {
  source = "../../modules/vpc"

  project_name = "myweb"
  env  = "dev"  
  vpc_cidr             = "10.0.0.0/16"
  azs                  = ["ap-northeast-2a", "ap-northeast-2c"]
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.10.0/24", "10.0.20.0/24"]
}