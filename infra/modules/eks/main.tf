resource "aws_iam_role" "cluster" {
    name = "${var.project_name}-${var.env}-eks-cluster-role"
    
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
                Service = "eks.amazonaws.com"
            }
        }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "cluster_policy" {
    role       = aws_iam_role.cluster.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

resource "aws_eks_cluster" "main" {
    name     = "${var.project_name}-${var.env}-eks-cluster"
    role_arn = aws_iam_role.cluster.arn

    vpc_config {
        subnet_ids = var.subnet_ids
        endpoint_public_access = true
        endpoint_private_access = true
    }

    access_config {
        authentication_mode = "API_AND_CONFIG_MAP"
        bootstrap_cluster_creator_admin_permissions = true
    }

    depends_on = [aws_iam_role_policy_attachment.cluster_policy]
}

resource "aws_iam_role" "node" {
    name = "${var.project_name}-${var.env}-eks-node-role"
    
    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
        {
            Action = "sts:AssumeRole"
            Effect = "Allow"
            Principal = {
            Service = "ec2.amazonaws.com"
            }
        }
        ]
    })
}

resource "aws_iam_role_policy_attachment" "node_policy" {
    for_each = toset([
        "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
        "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
        "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
    ])
    policy_arn = each.value
    role = aws_iam_role.node.name
}

resource "aws_eks_node_group" "main" {
    cluster_name    = aws_eks_cluster.main.name
    node_group_name = "${var.project_name}-${var.env}-eks-node-group"
    node_role_arn   = aws_iam_role.node.arn
    subnet_ids      = var.subnet_ids

    instance_types = [var.node_group.instance_type]

    scaling_config {
        desired_size = var.node_group.desired_size
        max_size     = var.node_group.max_size
        min_size     = var.node_group.min_size
    }

    depends_on = [aws_iam_role_policy_attachment.node_policy]
}

// OIDC Provider 생성
data "tls_certificate" "eks" {
    url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "eks" {
    client_id_list = ["sts.amazonaws.com"]
    thumbprint_list = [data.tls_certificate.eks.certificates[0].sha1_fingerprint]
    url = aws_eks_cluster.main.identity[0].oidc[0].issuer
}