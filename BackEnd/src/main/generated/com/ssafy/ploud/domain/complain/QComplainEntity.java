package com.ssafy.ploud.domain.complain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QComplainEntity is a Querydsl query type for ComplainEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QComplainEntity extends EntityPathBase<ComplainEntity> {

    private static final long serialVersionUID = -1281533926L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QComplainEntity complainEntity = new QComplainEntity("complainEntity");

    public final DateTimePath<java.time.LocalDateTime> complainTime = createDateTime("complainTime", java.time.LocalDateTime.class);

    public final StringPath content = createString("content");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final BooleanPath restriction = createBoolean("restriction");

    public final com.ssafy.ploud.domain.user.QUserEntity user;

    public QComplainEntity(String variable) {
        this(ComplainEntity.class, forVariable(variable), INITS);
    }

    public QComplainEntity(Path<? extends ComplainEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QComplainEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QComplainEntity(PathMetadata metadata, PathInits inits) {
        this(ComplainEntity.class, metadata, inits);
    }

    public QComplainEntity(Class<? extends ComplainEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.ploud.domain.user.QUserEntity(forProperty("user")) : null;
    }

}

