package com.ssafy.ploud.domain.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBoardEntity is a Querydsl query type for BoardEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBoardEntity extends EntityPathBase<BoardEntity> {

    private static final long serialVersionUID = -1757054934L;

    public static final QBoardEntity boardEntity = new QBoardEntity("boardEntity");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> likeCount = createNumber("likeCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> registerTime = createDateTime("registerTime", java.time.LocalDateTime.class);

    public final StringPath title = createString("title");

    public final StringPath userId = createString("userId");

    public final StringPath videoPath = createString("videoPath");

    public QBoardEntity(String variable) {
        super(BoardEntity.class, forVariable(variable));
    }

    public QBoardEntity(Path<? extends BoardEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBoardEntity(PathMetadata metadata) {
        super(BoardEntity.class, metadata);
    }

}

