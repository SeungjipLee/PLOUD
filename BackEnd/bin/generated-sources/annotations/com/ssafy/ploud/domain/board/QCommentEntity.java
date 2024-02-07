package com.ssafy.ploud.domain.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCommentEntity is a Querydsl query type for CommentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommentEntity extends EntityPathBase<CommentEntity> {

    private static final long serialVersionUID = 610323619L;

    public static final QCommentEntity commentEntity = new QCommentEntity("commentEntity");

    public final NumberPath<Integer> boardId = createNumber("boardId", Integer.class);

    public final StringPath comment = createString("comment");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> registerTime = createDateTime("registerTime", java.time.LocalDateTime.class);

    public final StringPath userId = createString("userId");

    public QCommentEntity(String variable) {
        super(CommentEntity.class, forVariable(variable));
    }

    public QCommentEntity(Path<? extends CommentEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCommentEntity(PathMetadata metadata) {
        super(CommentEntity.class, metadata);
    }

}

