data "http" "lbc_iam_policy" {
    url = "https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json"
}

resource "aws_iam_policy" "lbc" {
    name = "${var.project_name}-${var.env}-lbc-policy"
    policy = data.http.lbc_iam_policy.response_body
}

resource "aws_iam_role" "lbc" {
    name = "${var.project_name}-${var.env}-lbc-role"
    
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Action = "sts:AssumeRoleWithWebIdentity"
            Effect = "Allow"
            Principal = {
                Federated = var.oidc_provider_arn
            }
            Condition = {
                StringEquals = {
                    "${replace(var.oidc_provider_url, "https://", "")}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
                }
            }
        }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "lbc" {
    policy_arn = aws_iam_policy.lbc.arn
    role       = aws_iam_role.lbc.name
}

resource "helm_release" "lbc" {
    name = "aws-load-balancer-controller"
    repository = "https://aws.github.io/eks-charts"
    chart = "aws-load-balancer-controller"
    
    namespace = "kube-system"
    
    set {
        name = "clusterName"
        value = var.cluster_name
    }
    
    set {
        name = "serviceAccount.create"
        value = true
    }

    set {
        name = "serviceAccount.name"
        value = "aws-load-balancer-controller"
    }

    set {
        name = "serviceAccount.annotations.eks.\\.amazonaws\\.com/role-arn"
        value = aws_iam_role.lbc.arn
    }
}