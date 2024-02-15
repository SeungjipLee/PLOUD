package com.ssafy.ploud.domain.board;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHeartEntity is a Querydsl query type for HeartEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHeartEntity extends EntityPathBase<HeartEntity> {

    private static final long serialVersionUID = -668536438L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHeartEntity heartEntity = new QHeartEntity("heartEntity");

    public final QBoardEntity board;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.ssafy.ploud.domain.user.QUserEntity user;

    public QHeartEntity(String variable) {
        this(HeartEntity.class, forVariable(variable), INITS);
    }

    public QHeartEntity(Path<? extends HeartEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHeartEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHeartEntity(PathMetadata metadata, PathInits inits) {
        this(HeartEntity.class, metadata, inits);
    }

    public QHeartEntity(Class<? extends HeartEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.board = inits.isInitialized("board") ? new QBoardEntity(forProperty("board")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.ploud.domain.user.QUserEntity(forProperty("user")) : null;
    }

}

