resource "aws_db_subnet_group" "main" {
    name = "${var.project_name}-${var.env}-aurora-sng"
    subnet_ids = var.private_subnet_ids

    tags = {
      Name = "${var.project_name}-${var.env}-aurora-sng"
    }
}

resource "aws_rds_cluster" "main" {
    cluster_identifier = "${var.project_name}-${var.env}-aurora-cluster"
    engine = "aurora-mysql"
    engine_version = "8.0.mysql_aurora.3.04.1"
    database_name = "mywebdb"

    master_username = "admin"
    manage_master_user_password = true
    master_user_secret_kms_key_id = var.kms_key_arn

    db_subnet_group_name = aws_db_subnet_group.main.name
    vpc_security_group_ids = [var.db_sg_id]

    storage_encrypted = true
    kms_key_id = var.kms_key_arn

    skip_final_snapshot = true

    tags = {
        Name = "${var.project_name}-${var.env}-aurora-cluster"
    }
}

resource "aws_rds_cluster_instance" "main" {
    count = 2
    identifier = "${var.project_name}-${var.env}-aurora-instance-${count.index + 1}"
    cluster_identifier = aws_rds_cluster.main.id

    instance_class = "db.t3medium"
    engine = aws_rds_cluster.main.engine
    engine_version = aws_rds_cluster.main.engine_version

    tags = {
      Name = "${var.project_name}-${var.env}-aurora-instance-${count.index + 1}"
    }
}