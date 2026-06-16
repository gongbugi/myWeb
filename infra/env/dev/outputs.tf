output "cluster_name" {
  value = module.eks.cluster_name
}

output "aurora_cluster_endpoint" {
  value = module.aurora.cluster_endpoint
}

output "elasticache_redis_endpoint" {
  value = module.elasticache.redis_endpoint
}

output "s3_bucket_name" {
  value = module.frontend.s3_bucket_name
}

output "cloudfront_domain_name" {
  value = module.frontend.cloudfront_domain_name
}

output "cognito_user_pool_id" {
  value = module.cognito.user_pool_id
}

output "cognito_client_id" {
  value = module.cognito.client_id
}
