resource "aws_security_group" "db" {
    name = "${var.project_name}-${var.env}-db-sg"
    vpc_id = var.vpc_id

    ingress {
        from_port = 3306
        to_port = 3306
        protocol = "tcp"
        cidr_blocks = [var.vpc_cidr]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
      Name = "${var.project_name}-${var.env}-db-sg"
    }
}

resource "aws_security_group" "redis" {
    name = "${var.project_name}-${var.env}-redis-sg"
    vpc_id = var.vpc_id

    ingress {
        from_port = 6379
        to_port = 6379
        protocol = "tcp"
        cidr_blocks = [var.vpc_cidr]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
      Name = "${var.project_name}-${var.env}-redis-sg"
    }
}